import { ConsoleLogReporter, LoggerFactory } from "@toolcase/logging";

class CustomLoggerFactory extends LoggerFactory {

    static Instance = new CustomLoggerFactory()

    constructor() {
        super([
            new ConsoleLogReporter()
        ])
    }

}

export default CustomLoggerFactory