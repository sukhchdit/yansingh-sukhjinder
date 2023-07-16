using Microsoft.EntityFrameworkCore.Migrations;

namespace YanSingh.DAL.Migrations
{
    public partial class For10052023 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "UserSessions",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "users",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "states",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "Rights",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "OrganizationInfos",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "OrganizationContacts",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "MaidExperiences",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "MaidExperienceJobDuties",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "MaidDuties",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "workOnHoliday",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "vaccinated3Time",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "takeCareDisabledElderly",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "shareRoomWithElderlyKids",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "shareJobWithOtherHelpers",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "maidEmployementStatus",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "eatPork",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "careBigPet",
                table: "MaidDetails",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");

            migrationBuilder.AddColumn<bool>(
                name: "babies",
                table: "MaidDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "children",
                table: "MaidDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "cooking",
                table: "MaidDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "disabled",
                table: "MaidDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "elderly",
                table: "MaidDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "goOnHoliday",
                table: "MaidDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "hkExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "indonesiaExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "malaysiaExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "middleEastExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "otherExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "petCare",
                table: "MaidDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "philippinesExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "saudiArabiaExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "singaporeExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "taiwanExp",
                table: "MaidDetails",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "status",
                table: "countries",
                nullable: false,
                oldClrType: typeof(ulong),
                oldType: "bit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "babies",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "children",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "cooking",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "disabled",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "elderly",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "goOnHoliday",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "hkExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "indonesiaExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "malaysiaExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "middleEastExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "otherExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "petCare",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "philippinesExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "saudiArabiaExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "singaporeExp",
                table: "MaidDetails");

            migrationBuilder.DropColumn(
                name: "taiwanExp",
                table: "MaidDetails");

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "UserSessions",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "users",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "states",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "Rights",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "OrganizationInfos",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "OrganizationContacts",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "MaidExperiences",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "MaidExperienceJobDuties",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "MaidDuties",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "workOnHoliday",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "vaccinated3Time",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "takeCareDisabledElderly",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "shareRoomWithElderlyKids",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "shareJobWithOtherHelpers",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "maidEmployementStatus",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "eatPork",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "careBigPet",
                table: "MaidDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<ulong>(
                name: "status",
                table: "countries",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool));
        }
    }
}
