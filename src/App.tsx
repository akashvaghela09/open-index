import React, { useState, useEffect, useRef } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search, X } from "lucide-react";

type FileType = {
    fileType: string;
    buttonData: string;
    imageUrl: string;
    placeholder: string;
};

const fileTypes: FileType[] = [
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

const searchEngines = ["google", "startpage", "filepursuit"] as const;
const filePursuitTypes = [
    { type: "all", imageUrl: "/any.png" },
    { type: "ebook", imageUrl: "/book.png" },
    { type: "video", imageUrl: "/film.png" },
    { type: "audio", imageUrl: "/music.png" },
    { type: "mobile", imageUrl: "/apk.png" },
    { type: "archive", imageUrl: "/archive.png" },
];

const OpenIndexPage: React.FC = () => {
    const [query, setQuery] = useState("");
    const [fileType, setFileType] = useState<FileType>(fileTypes[0]);
    const [engine, setEngine] = useState<(typeof searchEngines)[number]>(
        searchEngines[0]
    );
    const [filePursuitType, setFilePursuitType] = useState(filePursuitTypes[0]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setFileType(fileTypes[0]);
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
            )}&type=${filePursuitType.type}&sort=datedesc`,
        };

        window.open(searchUrls[engine as keyof typeof searchUrls], "_blank");
    };

    const clearQuery = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    return (
        <TooltipProvider>
            <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white p-4 gap-4 md:gap-6">
                <div className="flex items-center gap-2 -mt-36">
                    <img
                        src="logo.png"
                        alt="open index logo"
                        className="size-16 md:size-24"
                    />
                    <h1 className="text-3xl md:text-4xl font-exo text-stone-500">
                        Open Index
                    </h1>
                </div>

                <div className="w-full max-w-3xl flex items-center">
                    <div className="flex items-center border border-r-0 border-zinc-300 rounded-l-lg overflow-hidden">
                        <Select
                            value={engine}
                            onValueChange={(value) =>
                                setEngine(
                                    value as (typeof searchEngines)[number]
                                )
                            }
                        >
                            <div className="border-r border-zinc-300">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <SelectTrigger className="w-20 md:w-fit border-0 rounded-none focus:ring-0">
                                            <img
                                                src={`/${engine}.png`}
                                                alt={engine}
                                                className="size-5"
                                            />
                                        </SelectTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Search engine</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <SelectContent>
                                {searchEngines.map((eng, index) => (
                                    <SelectItem key={index} value={eng}>
                                        <span className="flex items-center">
                                            <img
                                                src={`/${eng}.png`}
                                                alt={eng}
                                                className="size-5 mr-2"
                                            />
                                            {eng.charAt(0).toUpperCase() +
                                                eng.slice(1)}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {engine === "filepursuit" && (
                            <Select
                                value={filePursuitType.type}
                                onValueChange={(value) =>
                                    setFilePursuitType(
                                        filePursuitTypes.find(
                                            (ft) => ft.type === value
                                        ) || filePursuitTypes[0]
                                    )
                                }
                            >
                                <div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <SelectTrigger className="w-20 md:w-fit border-0 rounded-none focus:ring-0">
                                                <img
                                                    src={
                                                        filePursuitType.imageUrl
                                                    }
                                                    alt={filePursuitType.type}
                                                    className="size-5"
                                                />
                                            </SelectTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>File type</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <SelectContent>
                                    {filePursuitTypes.map((type, index) => (
                                        <SelectItem
                                            key={index}
                                            value={type.type}
                                        >
                                            <span className="flex items-center gap-1">
                                                <img
                                                    src={type.imageUrl}
                                                    alt={type.type}
                                                    className="size-5 mr-2"
                                                />
                                                {type.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    type.type.slice(1)}
                                            </span>
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
                                <div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <SelectTrigger className="w-20 md:w-fit border-0 rounded-none focus:ring-0">
                                                <img
                                                    src={fileType.imageUrl}
                                                    alt={fileType.buttonData}
                                                    className="size-5"
                                                />
                                            </SelectTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>File type</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>

                                <SelectContent>
                                    {fileTypes.map((type, index) => (
                                        <SelectItem
                                            key={index}
                                            value={index.toString()}
                                        >
                                            <span className="flex items-center gap-1">
                                                <img
                                                    src={type.imageUrl}
                                                    alt={type.buttonData}
                                                    className="size-5 mr-2"
                                                />
                                                {type.buttonData}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <div className="transition duration-200 flex flex-1 border border-r-0 border-zinc-300">
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full p-2 px-4 focus:outline-none border-0"
                            placeholder={fileType.placeholder}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        {query.length > 0 && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="bg-white flex items-center p-2">
                                        <X
                                            className="size-5 text-black opacity-30 hover:opacity-100 cursor-pointer"
                                            onClick={clearQuery}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Clear query</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className="flex items-center p-2 cursor-pointer rounded-r-lg bg-stone-500 hover:bg-stone-700 border border-l-0 border-stone-500"
                                onClick={startSearch}
                            >
                                <Search className="size-6 text-white" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Search</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default OpenIndexPage;
