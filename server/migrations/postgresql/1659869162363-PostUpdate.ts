import { MigrationInterface, QueryRunner } from 'typeorm'

export class PostUpdate1659869162363 implements MigrationInterface {
  name = 'PostUpdate1659869162363'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "media_type_enum" AS ENUM('IMAGE', 'VIDEO')`,
    )
    await queryRunner.query(
      `CREATE TABLE "media" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "type" "media_type_enum" NOT NULL, "postId" integer, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "post" ADD "content" character varying`,
    )
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_9dcde1b1308b5f22f34b8454e28" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_9dcde1b1308b5f22f34b8454e28"`,
    )
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`)
    await queryRunner.query(`DROP TABLE "media"`)
    await queryRunner.query(`DROP TYPE "media_type_enum"`)
  }
}
