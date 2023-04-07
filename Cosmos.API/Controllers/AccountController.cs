using System;
using System.Threading.Tasks;
using Cosmos.IAction.IAction;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.Helpers;
using Cosmos.Models.ViewModel.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cosmos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("MyPolicy")]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private IAccountAction _accountAction;

        public AccountController(IAccountAction accountAction)
        {
            _accountAction = accountAction;
        }

        // POST: api/Account/Authenticate
        /// <summary>
        /// To check Authantication For Email and password
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>        
        [Route("Authenticate")]
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]LoginViewModel userDto)
        {
            try
            {
                var response = await _accountAction.Authenticate(userDto);
                if (response != null)
                {
                    if (response.accessToken != null)
                    {
                        if (response.isPasswordOrEmailIncorrent)
                            return BadRequest(new { message = "Email or password is incorrect." });

                        if (response.userStatus == UserStatus.Pending)
                            return BadRequest(new { message = "Your account is not active yet!" });
                        else if (response.userStatus == UserStatus.Suspended)
                            return BadRequest(new { message = "Your account is blocked!" });
                        else if (response.userStatus == UserStatus.EmailActivationPending)
                            return BadRequest(new { message = "Account email verification is pending!" });
                        else if (response.userStatus == UserStatus.Rejected)
                            return BadRequest(new { message = "Account email verification is pending!" });

                        return Ok(new
                        {
                            access_token = response.accessToken,
                            expires_in = response.expiresIn,
                        });
                    }
                    else
                        return BadRequest(new { message = "Organization contact not available!" });
                }
                else
                    return BadRequest(new { message = "Something happened wrong at server!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.ToString() });
            }
        }

        [HttpPost]
        [Route("SetUserSession")]
        public async Task<IActionResult> SetUserSession(UserSession model)
        {
            var session=await _accountAction.SetUserSession(model);
            return Ok(session);
        }

        // POST: api/Account/Authenticate
        /// <summary>
        /// To check Authantication ForEmail and password
        /// </summary> userDTO
        /// <param name="userDto"></param>
        /// <returns></returns>        
        [Route("SetPassword")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SetPassword([FromBody] LoginViewModel model)
        {
            var user = await _accountAction.SetPassword(model);

            if (user == null)
                return BadRequest(new { message = "Something happened wrong at server!" });
            else if (user.isPasswordOrEmailIncorrent)
                return BadRequest(new { message = "Email or password is incorrect." });
            else if (user.userStatus == UserStatus.Pending)
                return BadRequest(new { message = "Your account is not active yet! Please contact administrator." });
            else if (user.userStatus == UserStatus.EmailActivationPending)
                return BadRequest(new { message = "Your account email activation is pending. Please check your email." });
            else if (user.userStatus == UserStatus.Suspended)
                return BadRequest(new { message = "Your account is blocked! Please contact administrator." });
            else if (user.userStatus == UserStatus.Active && user.isPasswordOrEmailIncorrent == false)
                return Ok(new { message = "Password has been reset succussfully!" });
            else
                return BadRequest(new { message = "Sorry but the link you clicked from the email has expired. Kindly click forgot password to generate another link to reset your password!" });
        }

        [AllowAnonymous]
        [Route("ActivateUser")]
        [HttpPost]
        public async Task<IActionResult> ActivateUser(LoginViewModel model)
        {
            var userModel = await _accountAction.ActivateUser(model);
            return Ok(userModel);
        }

        // POST: api/Account/Register
        /// <summary>
        /// Register new Admin on Behalf of model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            try
            {
                if (await _accountAction.RegisterAdminUser(model))
                {
                    return Ok(new { message = "You are successfully registered. Kindly verify your email in order to use the system." });
                }
                return BadRequest(new { message = "Something went wrong on the server!" });
            }
            catch (AppException ex)
            {
                var msg = ex.Message.ToString();
                return BadRequest(new { message = msg });
            }
        }


        [Route("CreateSponsor")]
        [HttpPost]
        public async Task<IActionResult> CreateSponsor([FromBody] RegisterViewModel model)
        {
            try
            {
                if (await _accountAction.CreateSponsor(model))
                {
                    return Ok(new { message = "Sponsor created successfully." });
                }
                return BadRequest(new { message = "Something went wrong on the server!" });
            }
            catch (AppException ex)
            {
                var msg = ex.Message.ToString();
                return BadRequest(new { message = msg });
            }
        }

        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPassword model)
        {
            try
            {
                if (await _accountAction.ForgotPassword(model))
                    return Ok(new { message = "Email has been successfully sent to reset password!" });
                else
                    return BadRequest(new { message = "User does not exist in our system!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        //private async Task SendForGotPasswordEmail(ForgotPassword model, string ResetPasswordKey)
        //{
        //    MailModel mailModel = new MailModel();
        //    mailModel.To = model.Email;
        //    mailModel.Subject = "Forgot Password";
        //    mailModel.Url = model.ClientAppBaseUrl + "setpassword/" + model.Email + "/" + ResetPasswordKey;
        //    mailModel.Body = EmailContent.CreateForgotPasswordHtml(mailModel, _hostingEnvironment);

        //    await _emailService.MailSendAsyc(mailModel);
        //}

        [Route("GetUser")]
        public IActionResult GetUser(long id)
        {
            var user = _accountAction.GetUserById(id);
            return Ok(user);
        }

        [Route("UpdateUser")]
        [HttpPost]
        public async Task<IActionResult> UpdateUser(User model)
        {
            var response = await _accountAction.UpdateUser(model);
            return Ok(new
            {
                access_token = response.accessToken,
                expires_in = response.expiresIn
            });

        }

        [Route("UpdateUserStatus")]
        [HttpGet]
        public async Task<IActionResult> UpdateUserStatus(long userId)
        {
            await _accountAction.UpdateUserStatus(userId);
            return Ok();
        }

        [Route("UpdateUserStatusByUserId")]
        [HttpGet]
        public async Task<IActionResult> UpdateUserStatusByUserId(long userId, UserStatus userStatus)
        {
            await _accountAction.UpdateUserStatus(userId, userStatus);
            return Ok();
        }

        [Route("UpdatePassword")]
        [HttpPost]
        public async Task<IActionResult> UpdatePassword(ChangePasswordViewModel model)
        {
            var user = await _accountAction.UpdatePassword(model);

            if (user == null)
                return BadRequest(new { message = "Current Password is incorrect." });

            return Ok(user);
        }

        [Route("DeleteUser")]
        [HttpDelete]
        public async Task<ActionResult> DeleteUser(long id)
        {
            try
            {
                await _accountAction.DeleteUser(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [Route("GetUsersByStatus")]
        public IActionResult GetUsersByStatus(UserStatus userStatus)
        {
            var user = _accountAction.GetUsersByUserStatus(userStatus);
            return Ok(user);
        }

        
    }
}