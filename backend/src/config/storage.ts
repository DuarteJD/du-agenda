interface IStorageConfig {
  storage: 'disk' | 's3';
  aws: {
    bucket: string;
  };
}

export default {
  storage: process.env.STORAGE || 'disk',
  aws: {
    bucket: 'du-agenda-bucket',
  },
} as IStorageConfig;
