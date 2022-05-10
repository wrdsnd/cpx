import { MigrationInterface, QueryRunner } from 'typeorm'

export class Subscriptions1629302703636 implements MigrationInterface {
  name = 'Subscriptions1629302703636'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_54a1a8fea1d0744a66011902bcb"`,
    )
  }
}
