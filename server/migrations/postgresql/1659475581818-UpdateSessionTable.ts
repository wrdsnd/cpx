import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateSessionTable1659475581818 implements MigrationInterface {
  name = 'UpdateSessionTable1659475581818'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "session"."sessionId" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "UQ_6f8fc3d2111ccc30d98e173d8dd" UNIQUE ("sessionId")`,
    )
    await queryRunner.query(`COMMENT ON COLUMN "session"."active" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "active" SET DEFAULT 'false'`,
    )
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "userId" DROP NOT NULL`,
    )
    await queryRunner.query(`COMMENT ON COLUMN "session"."userId" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    )
    await queryRunner.query(`COMMENT ON COLUMN "post"."timeslotId" IS NULL`)
    await queryRunner.query(`COMMENT ON COLUMN "session"."userId" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "userId" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "active" SET DEFAULT false`,
    )
    await queryRunner.query(`COMMENT ON COLUMN "session"."active" IS NULL`)
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "UQ_6f8fc3d2111ccc30d98e173d8dd"`,
    )
    await queryRunner.query(`COMMENT ON COLUMN "session"."sessionId" IS NULL`)
  }
}
