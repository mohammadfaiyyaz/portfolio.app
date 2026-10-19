export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
}

export class DriveApiError extends Error {
  status: number;
  isScopeError: boolean;
  rawError?: any;

  constructor(message: string, status: number, isScopeError: boolean, rawError?: any) {
    super(message);
    this.name = 'DriveApiError';
    this.status = status;
    this.isScopeError = isScopeError;
    this.rawError = rawError;
  }
}

export const listDriveFiles = async (
  accessToken: string,
  searchQuery = '',
  folderId?: string
): Promise<DriveFile[]> => {
  let q = "trashed = false";
  if (folderId) {
    q += ` and '${folderId}' in parents`;
  }
  if (searchQuery.trim()) {
    q += ` and name contains '${searchQuery.replace(/'/g, "\\'")}'`;
  }

  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.set(
    'fields',
    'files(id,name,mimeType,size,modifiedTime,webViewLink,webContentLink,iconLink,thumbnailLink)'
  );
  url.searchParams.set('orderBy', 'folder,modifiedTime desc');
  url.searchParams.set('pageSize', '50');
  url.searchParams.set('q', q);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    let isScopeError = false;
    let userMsg = `Google Drive API error (${res.status}): ${errorText}`;
    try {
      const parsed = JSON.parse(errorText);
      if (
        res.status === 403 &&
        (parsed.error?.status === 'PERMISSION_DENIED' ||
          parsed.error?.message?.includes('insufficient') ||
          parsed.error?.errors?.some((e: any) => e.reason === 'insufficientPermissions'))
      ) {
        isScopeError = true;
        userMsg =
          'Google Drive access permission is missing. Please re-authorize and ensure the Google Drive checkbox is checked on the consent screen.';
      }
    } catch {
      if (res.status === 403 && errorText.includes('insufficient')) {
        isScopeError = true;
        userMsg =
          'Google Drive access permission is missing. Please re-authorize and ensure the Google Drive checkbox is checked on the consent screen.';
      }
    }
    throw new DriveApiError(userMsg, res.status, isScopeError, errorText);
  }

  const data = await res.json();
  return data.files || [];
};

export const createDriveFolder = async (
  accessToken: string,
  folderName: string,
  parentId?: string
): Promise<DriveFile> => {
  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };
  if (parentId) {
    metadata.parents = [parentId];
  }

  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const err = await res.text();
    const isScopeError = res.status === 403 && err.includes('insufficient');
    throw new DriveApiError(
      isScopeError
        ? 'Google Drive permission missing. Please re-authorize.'
        : `Failed to create folder: ${err}`,
      res.status,
      isScopeError
    );
  }

  return await res.json();
};

export const uploadTextToDrive = async (
  accessToken: string,
  fileName: string,
  content: string,
  mimeType = 'text/plain',
  parentId?: string
): Promise<DriveFile> => {
  const metadata: any = {
    name: fileName,
    mimeType: mimeType,
  };
  if (parentId) {
    metadata.parents = [parentId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    const isScopeError = res.status === 403 && err.includes('insufficient');
    throw new DriveApiError(
      isScopeError
        ? 'Google Drive permission missing. Please re-authorize.'
        : `Failed to upload file to Drive: ${err}`,
      res.status,
      isScopeError
    );
  }

  return await res.json();
};

export const deleteDriveFile = async (
  accessToken: string,
  fileId: string
): Promise<void> => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.text();
    const isScopeError = res.status === 403 && err.includes('insufficient');
    throw new DriveApiError(
      isScopeError
        ? 'Google Drive permission missing. Please re-authorize.'
        : `Failed to delete file from Drive: ${err}`,
      res.status,
      isScopeError
    );
  }
};
