import { MigrationInterface, QueryRunner } from 'typeorm'

export class Schedules1591990446058 implements MigrationInterface {
  name = 'Schedules1591990446058'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "timeslot" ("id" SERIAL NOT NULL, "time" TIME NOT NULL, "scheduleId" integer, CONSTRAINT "PK_cd8bca557ee1eb5b090b9e63009" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "sourceId" character varying NOT NULL, "sourceMeta" jsonb NOT NULL, "sentAt" TIMESTAMP, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "scheduledOn" date, "timeslotId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "timeslot" ADD CONSTRAINT "FK_07d9f4ced4681d78a56e4605b51" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_54a1a8fea1d0744a66011902bcb" FOREIGN KEY ("timeslotId") REFERENCES "timeslot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_54a1a8fea1d0744a66011902bcb"`,
      undefined,
    )
    await queryRunner.query(
      `ALTER TABLE "timeslot" DROP CONSTRAINT "FK_07d9f4ced4681d78a56e4605b51"`,
      undefined,
    )
    await queryRunner.query(`DROP TABLE "post"`, undefined)
    await queryRunner.query(`DROP TABLE "timeslot"`, undefined)
    await queryRunner.query(`DROP TABLE "schedule"`, undefined)
  }
}
