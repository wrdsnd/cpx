import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDeletedAtColumn1597804301723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "queue" ADD "deletedAt" timestamp without time zone;`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "queue" DROP COLUMN "deletedAt";`)
  }
}
