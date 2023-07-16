using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace YanSingh.DAL.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "countries",
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
                    phonecode = table.Column<int>(nullable: false),
                    currencyCode = table.Column<string>(nullable: true),
                    currencySymbol = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_countries", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationInfos",
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
                    type = table.Column<int>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    taxId = table.Column<string>(nullable: true),
                    content = table.Column<string>(nullable: true),
                    organizationGuid = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationInfos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Rights",
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
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rights", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<long>(nullable: false),
                    createdOn = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<long>(nullable: false),
                    updatedOn = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    resetPasswordKey = table.Column<string>(nullable: true),
                    ResetPasswordTimeStamp = table.Column<DateTime>(nullable: true),
                    emailVerificationKey = table.Column<string>(nullable: true),
                    userStatus = table.Column<int>(nullable: false),
                    passwordHash = table.Column<byte[]>(nullable: true),
                    passwordSalt = table.Column<byte[]>(nullable: true),
                    lastLoginAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "states",
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
                    countryId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_states", x => x.id);
                    table.ForeignKey(
                        name: "FK_states_countries_countryId",
                        column: x => x.countryId,
                        principalTable: "countries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationContacts",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<long>(nullable: false),
                    createdOn = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<long>(nullable: false),
                    updatedOn = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    website = table.Column<string>(nullable: true),
                    phone = table.Column<string>(nullable: true),
                    mobile = table.Column<string>(nullable: true),
                    fax = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    firstName = table.Column<string>(nullable: true),
                    middleName = table.Column<string>(nullable: true),
                    lastName = table.Column<string>(nullable: true),
                    salutationId = table.Column<long>(nullable: true),
                    roleTypeId = table.Column<long>(nullable: true),
                    roleId = table.Column<long>(nullable: true),
                    userId = table.Column<long>(nullable: false),
                    organizationInfoId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationContacts", x => x.id);
                    table.ForeignKey(
                        name: "FK_OrganizationContacts_OrganizationInfos_organizationInfoId",
                        column: x => x.organizationInfoId,
                        principalTable: "OrganizationInfos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationContacts_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSessions",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    createdBy = table.Column<long>(nullable: false),
                    createdOn = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<long>(nullable: false),
                    updatedOn = table.Column<DateTime>(nullable: false),
                    status = table.Column<bool>(nullable: false),
                    correlationId = table.Column<string>(nullable: true),
                    userId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSessions", x => x.id);
                    table.ForeignKey(
                        name: "FK_UserSessions_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationContacts_organizationInfoId",
                table: "OrganizationContacts",
                column: "organizationInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationContacts_userId",
                table: "OrganizationContacts",
                column: "userId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_states_countryId",
                table: "states",
                column: "countryId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_userId",
                table: "UserSessions",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationContacts");

            migrationBuilder.DropTable(
                name: "Rights");

            migrationBuilder.DropTable(
                name: "states");

            migrationBuilder.DropTable(
                name: "UserSessions");

            migrationBuilder.DropTable(
                name: "OrganizationInfos");

            migrationBuilder.DropTable(
                name: "countries");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
