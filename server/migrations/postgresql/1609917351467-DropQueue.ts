import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropQueue1609917351467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "queue"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "queue" ("id" SERIAL NOT NULL, "sourceId" character varying NOT NULL, "sourceMeta" jsonb NOT NULL, "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id"))`,
      undefined,
    )
  }
}
