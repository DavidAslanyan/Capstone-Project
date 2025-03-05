import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741195230927 implements MigrationInterface {
    name = 'Migration1741195230927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "expires_at" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "expires_at" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_difficulty_level_enum" AS ENUM('easy', 'medium', 'hard')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255), "password" character varying(255) NOT NULL, "difficulty_level" "public"."user_difficulty_level_enum" NOT NULL, "role" "public"."user_role_enum" NOT NULL, "status" "public"."user_status_enum" NOT NULL, "progress" integer NOT NULL, "coins" integer NOT NULL, "games_passed" text array, "avatar" character varying(255) NOT NULL, "frame" character varying(255) NOT NULL, "avatars_purchased" text array, "frames_purchased" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions" ("roleId_1" uuid NOT NULL, "roleId_2" uuid NOT NULL, CONSTRAINT "PK_2832fae340f5d4f39d00432e355" PRIMARY KEY ("roleId_1", "roleId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0306191687b552827f11bb5050" ON "roles_permissions" ("roleId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_b047aecd2712e366566a8756ec" ON "roles_permissions" ("roleId_2") `);
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
        await queryRunner.query(`DROP INDEX "public"."IDX_b047aecd2712e366566a8756ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0306191687b552827f11bb5050"`);
        await queryRunner.query(`DROP TABLE "roles_permissions"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_difficulty_level_enum"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "access_token"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
