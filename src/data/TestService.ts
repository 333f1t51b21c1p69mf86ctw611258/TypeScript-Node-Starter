import { Sequelize } from "sequelize";
import SequelizeNS = require("sequelize");

export class TestService {
    private sequelize: Sequelize;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    public initsync(): void {
        const Test = this.sequelize.define("test", {
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

        Test.sync({ force: true }).then(function () {
            // Table created
            return Test.create({
                firstName: "test123",
                lastName: "test123"
            });
        });
    }
}