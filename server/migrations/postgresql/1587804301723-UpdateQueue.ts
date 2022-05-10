import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateQueue1587804301723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "queue" ALTER COLUMN "sentAt" DROP NOT NULL;`,
    )
    await queryRunner.query(
      `ALTER TABLE "queue" ALTER COLUMN "sentAt" DROP DEFAULT;`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "queue" ALTER COLUMN "sentAt" SET NOT NULL;`,
    )
    await queryRunner.query(
      `ALTER TABLE "queue" ALTER COLUMN "sentAt" SET DEFAULT now();`,
    )
  }
}
