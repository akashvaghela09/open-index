import React, { useState } from "react";

type FileType = {
    fileType: string;
    resType: string;
    buttonData: string;
    glyph: string;
    placeholder: string;
};

const fileTypes: FileType[] = [
    {
        fileType: "mkv|mp4|avi|mov|mpg|wmv|divx|mpeg",
        resType: "video",
        buttonData: "TV/Movies",
        glyph: "film",
        placeholder: "eg. The.Blacklist.S01",
    },
    {
        fileType:
            "MOBI|CBZ|CBR|CBC|CHM|EPUB|FB2|LIT|LRF|ODT|PDF|PRC|PDB|PML|RB|RTF|TCR|DOC|DOCX",
        resType: "ebook",
        buttonData: "Books",
        glyph: "book",
        placeholder: "eg. 1984",
    },
    {
        fileType: "mp3|wav|ac3|ogg|flac|wma|m4a|aac|mod",
        resType: "audio",
        buttonData: "Music",
        glyph: "music",
        placeholder: "eg. K.Flay discography",
    },
    {
        fileType: "exe|iso|dmg|tar|7z|bz2|gz|rar|zip|apk",
        resType: "archive",
        buttonData: "Software/ISO/DMG/Games",
        glyph: "cd",
        placeholder: "eg. GTA V",
    },
    {
        fileType: "jpg|png|bmp|gif|tif|tiff|psd",
        resType: "picture",
        buttonData: "Images",
        glyph: "picture",
        placeholder: "eg. Nature landscapes",
    },
    {
        fileType: "",
        resType: "all",
        buttonData: "Other",
        glyph: "asterisk",
        placeholder: "Search anything",
    },
];

const searchEngines = ["google", "startpage", "filepursuit"];

const SearchTool: React.FC = () => {
    const [query, setQuery] = useState("");
    const [fileType, setFileType] = useState<FileType>(fileTypes[5]);
    const [engine, setEngine] = useState(searchEngines[0]);

    const startSearch = () => {
        let finalQuery = query;
        const resType = fileType.resType;

        if (fileType.fileType) {
            finalQuery += ` +(${fileType.fileType}) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:"Index of" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)`;
        } else {
            finalQuery += ` -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:"Index of" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)`;
        }

        const searchUrls = {
            google: `https://www.google.com/search?q=${encodeURIComponent(
                finalQuery
            )}`,
            startpage: `https://www.startpage.com/do/dsearch?query=${encodeURIComponent(
                finalQuery
            )}`,
            filepursuit: `https://filepursuit.com/search/${query.replace(
                / /g,
                "+"
            )}/type/${resType}`,
        };

        window.open(searchUrls[engine], "_blank");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">
                Open Directory Search Tool
            </h1>

            <div className="w-full max-w-2xl">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choose a file type:
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) =>
                            setFileType(fileTypes[parseInt(e.target.value)])
                        }
                        value={fileTypes.indexOf(fileType)}
                    >
                        {fileTypes.map((type, index) => (
                            <option key={index} value={index}>
                                {type.buttonData}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choose a search engine:
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setEngine(e.target.value)}
                        value={engine}
                    >
                        {searchEngines.map((eng, index) => (
                            <option key={index} value={eng}>
                                {eng.charAt(0).toUpperCase() + eng.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your search query:
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder={fileType.placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <button
                    onClick={startSearch}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Search Open Directories
                </button>
            </div>
        </div>
    );
};

export default SearchTool;
