import Factory from "./Factory";
import ControllerInterface from "../http/controllers/ControllerInterface";

class ControllerFactory extends Factory {
    constructor() {
        super();
    }

    public create(): ControllerInterface {
        return ControllerMock;
    }

    protected fakeParameters(): void {}
}


class ControllerMock implements ControllerInterface {
    public static async exampleGetRequest(req: any, res: any) {
        res.status(200).send('Hello, world!');
    }

    public static async examplePostRequest(req: any, res: any) {
        res.status(200).send('Hello, world!');
    }

    public static async examplePutRequest(req: any, res: any) {
        res.status(200).send('Hello, world!');
    }

    public static async exampleDeleteRequest(req: any, res: any) {
        res.status(200).send('Hello, world!');
    }
}

export default ControllerFactory;