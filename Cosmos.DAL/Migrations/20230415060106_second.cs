using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Cosmos.DAL.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MaidDetails",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<long>(nullable: false),
                    createdOn = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<long>(nullable: false),
                    updatedOn = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    nickName = table.Column<string>(nullable: true),
                    nationality = table.Column<string>(nullable: true),
                    age = table.Column<int>(nullable: false),
                    dateOfBirth = table.Column<DateTime>(nullable: false),
                    height = table.Column<string>(nullable: true),
                    heightUnit = table.Column<string>(nullable: true),
                    weight = table.Column<string>(nullable: true),
                    weightUnit = table.Column<string>(nullable: true),
                    maritalStatus = table.Column<string>(nullable: true),
                    education = table.Column<string>(nullable: true),
                    religion = table.Column<string>(nullable: true),
                    spouseName = table.Column<string>(nullable: true),
                    spouseOccupation = table.Column<string>(nullable: true),
                    iAmNumber = table.Column<string>(nullable: true),
                    siblings = table.Column<string>(nullable: true),
                    numberOfSon = table.Column<string>(nullable: true),
                    numberOfDaughter = table.Column<string>(nullable: true),
                    passportNumber = table.Column<string>(nullable: true),
                    passportExpiryDate = table.Column<DateTime>(nullable: false),
                    hongKongId = table.Column<string>(nullable: true),
                    currentlyBasedIn = table.Column<string>(nullable: true),
                    currentContractStatus = table.Column<string>(nullable: true),
                    phone = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    currentAddress = table.Column<string>(nullable: true),
                    currentCity = table.Column<string>(nullable: true),
                    currentCountry = table.Column<string>(nullable: true),
                    permanentAddress = table.Column<string>(nullable: true),
                    referralName = table.Column<string>(nullable: true),
                    languageCantonese = table.Column<string>(nullable: true),
                    languageCantoneseStatus = table.Column<string>(nullable: true),
                    languageEnglish = table.Column<string>(nullable: true),
                    languageEnglishStatus = table.Column<string>(nullable: true),
                    languageMandarin = table.Column<string>(nullable: true),
                    languageMandarinStatus = table.Column<string>(nullable: true),
                    workOnHoliday = table.Column<bool>(nullable: false),
                    eatPork = table.Column<bool>(nullable: false),
                    careBigPet = table.Column<bool>(nullable: false),
                    vaccinated3Time = table.Column<bool>(nullable: false),
                    shareJobWithOtherHelpers = table.Column<bool>(nullable: false),
                    takeCareDisabledElderly = table.Column<bool>(nullable: false),
                    shareRoomWithElderlyKids = table.Column<bool>(nullable: false),
                    chineseZodiac = table.Column<string>(nullable: true),
                    maidCode = table.Column<string>(nullable: true),
                    lastFinishContractDate = table.Column<DateTime>(nullable: false),
                    maidEmployementStatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaidDetails", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "MaidDuties",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<long>(nullable: false),
                    createdOn = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<long>(nullable: false),
                    updatedOn = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    dutyName = table.Column<string>(nullable: true),
                    maidDetailId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaidDuties", x => x.id);
                    table.ForeignKey(
                        name: "FK_MaidDuties_MaidDetails_maidDetailId",
                        column: x => x.maidDetailId,
                        principalTable: "MaidDetails",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaidExperiences",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<long>(nullable: false),
                    createdOn = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<long>(nullable: false),
                    updatedOn = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    startDate = table.Column<DateTime>(nullable: false),
                    endDate = table.Column<DateTime>(nullable: false),
                    countryName = table.Column<string>(nullable: true),
                    experienceYears = table.Column<string>(nullable: true),
                    sizeOfHouse = table.Column<string>(nullable: true),
                    lastSalary = table.Column<string>(nullable: true),
                    numberOfPersonServed = table.Column<int>(nullable: false),
                    reasonOfLeaving = table.Column<string>(nullable: true),
                    maidDetailId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaidExperiences", x => x.id);
                    table.ForeignKey(
                        name: "FK_MaidExperiences_MaidDetails_maidDetailId",
                        column: x => x.maidDetailId,
                        principalTable: "MaidDetails",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaidExperienceJobDuties",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<long>(nullable: false),
                    createdOn = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<long>(nullable: false),
                    updatedOn = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    dutyName = table.Column<string>(nullable: true),
                    maidExperienceId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaidExperienceJobDuties", x => x.id);
                    table.ForeignKey(
                        name: "FK_MaidExperienceJobDuties_MaidExperiences_maidExperienceId",
                        column: x => x.maidExperienceId,
                        principalTable: "MaidExperiences",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaidDuties_maidDetailId",
                table: "MaidDuties",
                column: "maidDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_MaidExperienceJobDuties_maidExperienceId",
                table: "MaidExperienceJobDuties",
                column: "maidExperienceId");

            migrationBuilder.CreateIndex(
                name: "IX_MaidExperiences_maidDetailId",
                table: "MaidExperiences",
                column: "maidDetailId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaidDuties");

            migrationBuilder.DropTable(
                name: "MaidExperienceJobDuties");

            migrationBuilder.DropTable(
                name: "MaidExperiences");

            migrationBuilder.DropTable(
                name: "MaidDetails");
        }
    }
}
