export type RootStackParamList = {
  Home: undefined;
  Search: { query?: string }; // <--- opcjonalne, więc nie psuje innych miejsc
  Detail: { videoId: string };
};
