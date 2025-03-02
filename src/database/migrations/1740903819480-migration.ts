import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740903819480 implements MigrationInterface {
    name = 'Migration1740903819480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "coins" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "games_passed" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "games_passed"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "coins"`);
    }

}
