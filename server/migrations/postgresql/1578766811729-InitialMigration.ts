import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1578766811729 implements MigrationInterface {
  name = 'InitialMigration1578766811729'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "queue" ("id" SERIAL NOT NULL, "sourceId" character varying NOT NULL, "sourceMeta" jsonb NOT NULL, "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "sessionId" character varying NOT NULL, "userId" integer NOT NULL, "active" boolean NOT NULL DEFAULT 'false', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "salt" character varying NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`, undefined)
    await queryRunner.query(`DROP TABLE "session"`, undefined)
    await queryRunner.query(`DROP TABLE "queue"`, undefined)
  }
}
