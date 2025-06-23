export default function Footer() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `
<footer style="background-color: #f6f6f6; padding: 2rem; text-align: center;">
  <div id="mlb2-27522838" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-27522838">
    <div class="ml-form-align-center">
      <div class="ml-form-embedWrapper embedForm">
        <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
          <div class="ml-form-embedContent">
            <h4 style="margin-bottom: 0.5rem;">Fresno Music Calendar</h4>
            <p>Sign up for weekly updates and notices!</p>
          </div>
          <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1613419/forms/157952342155593362/subscribe" method="post" target="_blank" style="display: flex; flex-direction: column; align-items: center;">
            <input aria-label="email" aria-required="true" type="email" name="fields[email]" placeholder="Email" autocomplete="email" style="padding: 0.5rem; font-size: 1rem; width: 100%; max-width: 300px; margin-bottom: 1rem;">
            <input type="hidden" name="ml-submit" value="1">
            <input type="hidden" name="anticsrf" value="true">
            <button type="submit" class="primary" style="padding: 0.5rem 1rem; font-size: 1rem; background-color: #000; color: #fff; border: none; cursor: pointer;">Subscribe</button>
          </form>
        </div>
        <div class="ml-form-successBody row-success" style="display: none">
          <div class="ml-form-successContent">
            <h4>Thank you!</h4>
            <p>You have successfully joined our subscriber list.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
` }} />
  );
}