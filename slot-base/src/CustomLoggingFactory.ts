import { ConsoleLogReporter, LoggerFactory } from "@toolcase/logging";

class CustomLoggerFactory extends LoggerFactory {

    constructor() {
        super([
            new ConsoleLogReporter()
        ])
    }

}

export default CustomLoggerFactory