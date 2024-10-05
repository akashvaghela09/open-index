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
import {
    FilePursuitTypeList,
    FileType,
    FileTypeList,
    SearchEngineList,
} from "./constants";

const OpenIndexPage: React.FC = () => {
    const [query, setQuery] = useState("");
    const [fileType, setFileType] = useState<FileType>(FileTypeList[0]);
    const [engine, setEngine] = useState<(typeof SearchEngineList)[number]>(
        SearchEngineList[0]
    );
    const [filePursuitType, setFilePursuitType] = useState(
        FilePursuitTypeList[0]
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setFileType(FileTypeList[0]);
        setFilePursuitType(FilePursuitTypeList[0]);

        focusOnSearchInput();
    }, [engine]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            startSearch();
        }
    };

    const startSearch = () => {
        let finalQuery = query;

        if (query.trim() === "") {
            return;
        }

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

    const waitFor = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const focusOnSearchInput = async () => {
        await waitFor(200);
        inputRef.current?.focus();
    };

    const clearQuery = () => {
        setQuery("");
        focusOnSearchInput();
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

                <div className="w-full max-w-3xl flex items-center hover:shadow-md focus-within:shadow-md rounded-lg">
                    <div className="flex items-center border border-r-0 border-zinc-300 rounded-l-lg overflow-hidden">
                        <Select
                            value={engine}
                            onValueChange={(value) => {
                                setEngine(
                                    value as (typeof SearchEngineList)[number]
                                );
                                focusOnSearchInput();
                            }}
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
                                {SearchEngineList.map((eng, index) => (
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
                                onValueChange={(value) => {
                                    setFilePursuitType(
                                        FilePursuitTypeList.find(
                                            (ft) => ft.type === value
                                        ) || FilePursuitTypeList[0]
                                    );
                                    focusOnSearchInput();
                                }}
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
                                    {FilePursuitTypeList.map((type, index) => (
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
                                value={FileTypeList.indexOf(
                                    fileType
                                ).toString()}
                                onValueChange={(value) => {
                                    setFileType(FileTypeList[parseInt(value)]);
                                    focusOnSearchInput();
                                }}
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
                                    {FileTypeList.map((type, index) => (
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
