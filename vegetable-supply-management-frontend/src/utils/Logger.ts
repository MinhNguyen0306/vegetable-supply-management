const LoggerFactory = (type : string) => {
    function message(mes: string) {
        console.log(`[${type}]: ${mes}`)
    }

    return message;
}