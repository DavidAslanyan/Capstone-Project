import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741100834763 implements MigrationInterface {
    name = 'Migration1741100834763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "games_passed"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "games_passed" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "games_passed"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "games_passed" integer NOT NULL`);
    }

}
