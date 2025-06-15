    import {Alert} from "@heroui/react";
    import { time } from "console";
    import { useEffect, useState } from "react";
    interface ErrorProps{
        color: "warning" | "default" | "primary" | "secondary" | "success" | "danger" | undefined;
        message: string;
        timeout: number;
    }

    const ErrorMs: React.FC<ErrorProps> = ({
    color = "warning",
    message = "Something went wrong. Please try again later",
    timeout = 3000,
    }) => {
    
    const [isVisiable, setIsVisiable] = useState(true);

    useEffect (() => {
        const timer = setTimeout (() => {
            setIsVisiable(false);
        }, timeout)
        return () => clearTimeout(timer);
    }, [timeout])

    if (!isVisiable){
        return null;
    }
    return (
        <div className="absolute bottom-2 left-4">
        <div className="flex flex-col w-full">
            <div key={color} className="w-full flex items-center my-3">
                <Alert color={color} title={message} />
            </div>
        </div>
        </div>
    );
    }
export default ErrorMs;