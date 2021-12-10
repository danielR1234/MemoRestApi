import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1639090064435 implements MigrationInterface {
    name = 'migration1639090064435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "memo" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_612b46ac33a01fda3efb085302d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "memo"
        `);
    }

}
