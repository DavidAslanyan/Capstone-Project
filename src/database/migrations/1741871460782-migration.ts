import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741871460782 implements MigrationInterface {
    name = 'Migration1741871460782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "access_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "access_token" text`);
    }

}
