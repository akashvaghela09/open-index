import React, { useState, useEffect } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

type FileType = {
    fileType: string;
    buttonData: string;
    glyph: string;
    placeholder: string;
};

const fileTypes: FileType[] = [
    {
        fileType: "mkv|mp4|avi|mov|mpg|wmv|divx|mpeg",
        buttonData: "TV/Movies",
        glyph: "film",
        placeholder: "eg. The.Blacklist.S01",
    },
    {
        fileType:
            "MOBI|CBZ|CBR|CBC|CHM|EPUB|FB2|LIT|LRF|ODT|PDF|PRC|PDB|PML|RB|RTF|TCR|DOC|DOCX",
        buttonData: "Books",
        glyph: "book",
        placeholder: "eg. 1984",
    },
    {
        fileType: "mp3|wav|ac3|ogg|flac|wma|m4a|aac|mod",
        buttonData: "Music",
        glyph: "music",
        placeholder: "eg. K.Flay discography",
    },
    {
        fileType: "exe|iso|dmg|tar|7z|bz2|gz|rar|zip|apk",
        buttonData: "Software/ISO/DMG/Games",
        glyph: "cd",
        placeholder: "eg. GTA V",
    },
    {
        fileType: "jpg|png|bmp|gif|tif|tiff|psd",
        buttonData: "Images",
        glyph: "picture",
        placeholder: "eg. Nature landscapes",
    },
    {
        fileType: "",
        buttonData: "Any",
        glyph: "asterisk",
        placeholder: "Search anything",
    },
];

const searchEngines = ["google", "startpage", "filepursuit"] as const;
const filePursuitTypes = [
    "all",
    "ebook",
    "video",
    "audio",
    "mobile",
    "archive",
];

const SearchTool: React.FC = () => {
    const [query, setQuery] = useState("");
    const [fileType, setFileType] = useState<FileType>(fileTypes[5]);
    const [engine, setEngine] = useState<(typeof searchEngines)[number]>(
        searchEngines[0]
    );
    const [filePursuitType, setFilePursuitType] = useState(filePursuitTypes[0]);

    useEffect(() => {
        setFileType(fileTypes[5]);
        setFilePursuitType(filePursuitTypes[0]);
    }, [engine]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            startSearch();
        }
    };

    const startSearch = () => {
        let finalQuery = query;

        if (fileType.fileType && engine !== "filepursuit") {
            finalQuery += ` +(${fileType.fileType}) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:"Index of" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)`;
        } else {
            finalQuery += ` -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:"Index of" -inurl:(listen77|mp3raid|mp3toss|mp3drug|index_of|index-of|wallywashis|downloadmana)`;
        }

        const searchUrls: {
            google: string;
            startpage: string;
            filepursuit: string;
        } = {
            google: `https://www.google.com/search?q=${encodeURIComponent(
                finalQuery
            )}`,
            startpage: `https://www.startpage.com/do/search?query=${encodeURIComponent(
                finalQuery
            )}`,
            filepursuit: `https://filepursuit.com/pursuit?q=${encodeURIComponent(
                query
            )}&type=${filePursuitType}&sort=datedesc`,
        };

        window.open(searchUrls[engine as keyof typeof searchUrls], "_blank");
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white p-4 gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-6 -mt-36">
                <img
                    src="logo.png"
                    alt="open index logo"
                    className="size-16 md:size-24"
                />
                <h1 className="text-4xl md:text-6xl font-exo text-stone-500">
                    Open Index
                </h1>
            </div>

            <div className="w-full max-w-3xl flex items-center border rounded-lg overflow-hidden border-zinc-300 divide-x-2">
                <Select
                    value={engine}
                    onValueChange={(value) =>
                        setEngine(value as (typeof searchEngines)[number])
                    }
                >
                    <SelectTrigger className="w-20 md:w-fit border-0 rounded-none focus:ring-0">
                        <SelectValue placeholder="Select a search engine" />
                    </SelectTrigger>
                    <SelectContent>
                        {searchEngines.map((eng, index) => (
                            <SelectItem key={index} value={eng}>
                                {eng.charAt(0).toUpperCase() + eng.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {engine === "filepursuit" && (
                    <Select
                        value={filePursuitType}
                        onValueChange={setFilePursuitType}
                    >
                        <SelectTrigger className="w-20 md:w-fit border-0 rounded-none focus:ring-0">
                            <SelectValue placeholder="Select a file type" />
                        </SelectTrigger>
                        <SelectContent>
                            {filePursuitTypes.map((type, index) => (
                                <SelectItem key={index} value={type}>
                                    {type.charAt(0).toUpperCase() +
                                        type.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {engine !== "filepursuit" && (
                    <Select
                        value={fileTypes.indexOf(fileType).toString()}
                        onValueChange={(value) =>
                            setFileType(fileTypes[parseInt(value)])
                        }
                    >
                        <SelectTrigger className="w-20 md:w-fit border-0 rounded-none focus:ring-0">
                            <SelectValue placeholder="Select a file type" />
                        </SelectTrigger>
                        <SelectContent>
                            {fileTypes.map((type, index) => (
                                <SelectItem
                                    key={index}
                                    value={index.toString()}
                                >
                                    {type.buttonData}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                <div className="bg-stone-500 hover:bg-stone-700 transition duration-200 flex flex-1">
                    <input
                        type="text"
                        className="w-full p-2 px-4 focus:outline-none border-0"
                        placeholder={fileType.placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <div
                        className="flex items-center p-2 cursor-pointer rounded-r-lg"
                        onClick={startSearch}
                    >
                        <Search className="size-6 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchTool;
