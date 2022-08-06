import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropSalt1658612279710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN salt', undefined)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ADD COLUMN "salt" character varying NOT NULL',
      undefined,
    )
  }
}
