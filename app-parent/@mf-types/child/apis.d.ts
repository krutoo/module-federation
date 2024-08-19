
    export type RemoteKeys = 'child/App';
    type PackageType<T> = T extends 'child/App' ? typeof import('child/App') :any;