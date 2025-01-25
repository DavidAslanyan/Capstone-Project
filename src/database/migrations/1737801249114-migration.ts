import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737801249114 implements MigrationInterface {
    name = 'Migration1737801249114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "access_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "expires_at" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "expires_at" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions" ("roleId_1" uuid NOT NULL, "roleId_2" uuid NOT NULL, CONSTRAINT "PK_2832fae340f5d4f39d00432e355" PRIMARY KEY ("roleId_1", "roleId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0306191687b552827f11bb5050" ON "roles_permissions" ("roleId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_b047aecd2712e366566a8756ec" ON "roles_permissions" ("roleId_2") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying(255) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_difficulty_level_enum" AS ENUM('easy', 'medium', 'hard')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "difficulty_level" "public"."user_difficulty_level_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive', 'deleted')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "access_token" ADD CONSTRAINT "FK_4bd9bc00776919370526766eb43" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_0306191687b552827f11bb50505" FOREIGN KEY ("roleId_1") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_b047aecd2712e366566a8756ec7" FOREIGN KEY ("roleId_2") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_b047aecd2712e366566a8756ec7"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_0306191687b552827f11bb50505"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_6bbe63d2fe75e7f0ba1710351d4"`);
        await queryRunner.query(`ALTER TABLE "access_token" DROP CONSTRAINT "FK_4bd9bc00776919370526766eb43"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "difficulty_level"`);
        await queryRunner.query(`DROP TYPE "public"."user_difficulty_level_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b047aecd2712e366566a8756ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0306191687b552827f11bb5050"`);
        await queryRunner.query(`DROP TABLE "roles_permissions"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "access_token"`);
    }

}
