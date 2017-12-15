import SequelizeNS = require("sequelize");
import { TestService } from "./TestService";

export class Database {
    private testService: TestService;
    private sequelize = new SequelizeNS("testdb", "wimo_user", "12345678", {
        host: "localhost",
        dialect: "mysql",
        pool: {
            max: 100,
            min: 1,
            idle: 10000
        },
        logging: false
    });

    public initsync(): void {
        this.testService.initsync();

        const Test2 = this.sequelize.define("test2", {
            firstName: {
                type: SequelizeNS.STRING,
                field: "first_name" // Will result in an attribute that is firstName when user facing but first_name in the database
            },
            lastName: {
                type: SequelizeNS.STRING
            }
        }, {
                freezeTableName: true // Model tableName will be the same as the model name
            });

        Test2.sync({ force: false }).then(function () {
            // Table created
            return Test2.create({
                firstName: "test",
                lastName: "test"
            });
        });
    }

    constructor() {
        this.testService = new TestService(this.sequelize);
    }
}