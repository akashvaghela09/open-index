export type FileType = {
    fileType: string;
    buttonData: string;
    imageUrl: string;
    placeholder: string;
};

export const FileTypeList: FileType[] = [
    {
        fileType: "",
        buttonData: "Any",
        imageUrl: "/any.png",
        placeholder: "Search anything",
    },
    {
        fileType: "mkv|mp4|avi|mov|mpg|wmv|divx|mpeg",
        buttonData: "TV/Movies",
        imageUrl: "/film.png",
        placeholder: "eg. The.Blacklist.S01",
    },
    {
        fileType:
            "MOBI|CBZ|CBR|CBC|CHM|EPUB|FB2|LIT|LRF|ODT|PDF|PRC|PDB|PML|RB|RTF|TCR|DOC|DOCX",
        buttonData: "Books",
        imageUrl: "/book.png",
        placeholder: "eg. 1984",
    },
    {
        fileType: "mp3|wav|ac3|ogg|flac|wma|m4a|aac|mod",
        buttonData: "Music",
        imageUrl: "/music.png",
        placeholder: "eg. K.Flay discography",
    },
    {
        fileType: "exe|iso|dmg|tar|7z|bz2|gz|rar|zip|apk",
        buttonData: "Software/ISO/DMG/Games",
        imageUrl: "/disc.png",
        placeholder: "eg. GTA V",
    },
    {
        fileType: "jpg|png|bmp|gif|tif|tiff|psd",
        buttonData: "Images",
        imageUrl: "/image.png",
        placeholder: "eg. Nature landscapes",
    },
];

export const SearchEngineList = ["google", "startpage", "filepursuit"] as const;

export const FilePursuitTypeList = [
    { type: "all", imageUrl: "/any.png" },
    { type: "ebook", imageUrl: "/book.png" },
    { type: "video", imageUrl: "/film.png" },
    { type: "audio", imageUrl: "/music.png" },
    { type: "mobile", imageUrl: "/apk.png" },
    { type: "archive", imageUrl: "/archive.png" },
];
