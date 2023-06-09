﻿using Cosmos.Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cosmos.Models.Entities.Maid
{
    public class MaidDetail : BaseEntity
    {
        public string name { get; set; }
        public string nickName { get; set; }
        public string nationality { get; set; }
        public int age { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string height { get; set; }
        public string heightUnit { get; set; }
        public string weight { get; set; }
        public string weightUnit { get; set; }
        public string maritalStatus { get; set; }
        public string education { get; set; }
        public string religion { get; set; }
        public string spouseName { get; set; }
        public string spouseOccupation { get; set; }
        public string iAmNumber { get; set; }
        public string siblings { get; set; }
        public string numberOfSon { get; set; }
        public string numberOfDaughter { get; set; }
        public string passportNumber { get; set; }
        public DateTime passportExpiryDate { get; set; }
        public string hongKongId { get; set; }
        public string currentlyBasedIn { get; set; }
        public string currentContractStatus { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string currentAddress { get; set; }
        public string currentCity { get; set; }
        public string currentCountry { get; set; }
        public string permanentAddress { get; set; }
        public string referralName { get; set; }

        public string languageCantonese { get; set; }
        public string languageCantoneseStatus { get; set; }
        public string languageEnglish { get; set; }
        public string languageEnglishStatus { get; set; }
        public string languageMandarin { get; set; }
        public string languageMandarinStatus { get; set; }
        public bool workOnHoliday { get; set; }
        public bool eatPork { get; set; }
        public bool careBigPet { get; set; }
        public bool vaccinated3Time { get; set; }
        public bool shareJobWithOtherHelpers { get; set; }
        public bool takeCareDisabledElderly { get; set; }
        public bool shareRoomWithElderlyKids { get; set; }
        public bool goOnHoliday { get; set; }
        public string chineseZodiac { get; set; }
        public string maidCode { get; set; }
        public DateTime lastFinishContractDate { get; set; }
        public bool maidEmployementStatus { get; set; }

        //countries experience
        public string hkExp { get; set; }
        public string singaporeExp { get; set; }
        public string taiwanExp { get; set; }
        public string malaysiaExp { get; set; }
        public string middleEastExp { get; set; }
        public string saudiArabiaExp { get; set; }
        public string indonesiaExp { get; set; }
        public string philippinesExp { get; set; }
        public string otherExp { get; set; }

        //maid duties
        public bool babies { get; set; }
        public bool children { get; set; }
        public bool elderly { get; set; }
        public bool disabled { get; set; }
        public bool petCare { get; set; }
        public bool cooking { get; set; }

        public IList<MaidExperience> maidExperienceJobDuty { get; set; }
    }
}
