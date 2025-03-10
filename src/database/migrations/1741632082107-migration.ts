import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741632082107 implements MigrationInterface {
    name = 'Migration1741632082107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "points" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "points"`);
    }

}
