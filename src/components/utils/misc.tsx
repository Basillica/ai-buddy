export const sortAlphabetically = (
    items: {
        id: number;
        name: string;
    }[]
) => {
    const sortedItems = [...items].sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    return sortedItems;
};

export const sortReverseAlphabetically = (
    items: {
        id: number;
        name: string;
    }[]
) => {
    const sortedItems = [...items].sort((a, b) => {
        return b.name.localeCompare(a.name); // Reverse order
    });
    return sortedItems;
};

export const getTimeDifference = (endTime: string, startTime: string) => {
    const time_start = new Date();
    const time_end = new Date();
    const value_start = startTime.split(":");
    const value_end = endTime.split(":");

    time_start.setHours(Number(value_start[0]), Number(value_start[1]), 0);
    time_end.setHours(Number(value_end[0]), Number(value_end[1]), 0);
    return +time_end - +time_start;
};

export const getPastTimeForFilters = (filterName: string) => {
    const time = new Date();

    switch (filterName) {
        case "1D":
            time.setDate(time.getUTCDate() - 1);
            break;
        case "1W":
            time.setDate(time.getDate() - 7);
            break;
        case "1M":
            time.setMonth(time.getUTCMonth() - 1);
            break;
        case "3M":
            time.setMonth(time.getUTCMonth() - 3);
            break;
        case "6M":
            time.setMonth(time.getUTCMonth() - 6);
            break;
        case "1Y":
            time.setFullYear(time.getUTCFullYear() - 1);
            break;
        case "LIVE":
            time.setHours(time.getHours() - 2);
            break;
        case "CUSTOM":
            break;
        default:
            break;
    }
    return time.toISOString();
};

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const getRandomStr = (len: number) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < len) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};
