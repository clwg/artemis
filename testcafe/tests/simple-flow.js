import { Selector } from 'testcafe';

fixture `artemis`
    .page `https://localhost:8443`;

test('Simple Flow', async t => {
    await t
        .typeText(Selector('#email'), 'admin')
        .pressKey('tab')
        .typeText(Selector('#password'), 'admin123')
        .click(Selector('#submit'))
        .expect(Selector('li').withText('Clock').textContent).contains("Clock On 1/1")
        .expect(Selector('li').withText('Configuration').textContent).contains("Configuration On 1/1")
        .expect(Selector('li').withText('Database v.19').textContent).contains("Database v.19 On 1/1")
        .expect(Selector('li').withText('Detection').textContent).contains("Detection On 0/1")
        .expect(Selector('#modules_states').find('li').withText('Mitigation').textContent).contains("Mitigation On 0/1")
        .expect(Selector('#modules_states').find('li').withText('Monitor').textContent).contains("Monitor On 0/1")
        .expect(Selector('li').withText('Observer').textContent).contains("Observer On 1/1")
        .expect(Selector('#db_stat_value_monitored_prefixes').find('b').withText('1').textContent).eql("1")
        .expect(Selector('#db_stat_value_configured_prefixes').find('b').withText('3').textContent).eql("3")
        .expect(Selector('p').withText('ARTEMIS v.\'latest\'').textContent).eql("ARTEMIS v.'latest'")
        .click(Selector('#navbar_bgpupdates'))
        .expect(Selector('h3').withText('No BGP Updates to display').textContent).eql("No BGP Updates to display")
        .click(Selector('#navbar_hijacks'))
        .expect(Selector('h3').withText('No hijack alerts. Go grab a beer!').textContent).eql("No hijack alerts. Go grab a beer!")
        .click(Selector('a').withText('Admin'))
        .click(Selector('a').withText('System'))
        .expect(Selector('#module_monitor_instances_running').find('button').withText('Active 0/1').textContent).eql(" Active 0/1")
        .expect(Selector('#module_detection_instances_running').find('button').withText('Active 0/1').textContent).eql(" Active 0/1")
        .expect(Selector('#module_mitigation_instances_running').find('button').withText('Active 0/1').textContent).eql(" Active 0/1")
        .click(Selector('#system_modules_mitigation').find('.slider.round'))
        .expect(Selector('button').withText('Active 1/1').textContent).eql(" Active 1/1", 'Mitigation Module Active', {
            timeout: 3000
        })
        .click(Selector('#config_action'))
        .doubleClick(Selector('div').withText('1').nth(33).find('.CodeMirror-line'))
        .typeText(Selector('.CodeMirror.cm-s-default.CodeMirror-focused').find('div').find('textarea'), '# test config')
        .click(Selector('#config_action'))
        .click(Selector('a').withText('Admin'))
        .click(Selector('a').withText('System'))
        .expect(Selector('span').withText('# test config').find('.cm-comment').textContent).contains("# test config")
        .click(Selector('a').withText('Actions'))
        .click(Selector('a').withText('Change Password'))
        .typeText(Selector('#old_password'), 'admin123')
        .pressKey('tab')
        .typeText(Selector('#password'), '321admin')
        .pressKey('tab')
        .typeText(Selector('#confirm'), '321admin')
        .click(Selector('#submit'))
        .click(Selector('a').withText('Sign out'))
        .typeText(Selector('#email'), 'admin')
        .pressKey('tab')
        .typeText(Selector('#password'), '321admin')
        .click(Selector('#submit'))
        .expect(Selector('#modules_states').find('li').withText('Mitigation').textContent).contains("Mitigation On 1/1")
        .click(Selector('a').withText('Admin'))
        .click(Selector('a').withText('System'))
        .click(Selector('#system_modules_mitigation').find('.slider.round'))
        .expect(Selector('#module_mitigation_instances_running').find('button').withText('Active 0/1').textContent).eql(" Active 0/1")
        .click(Selector('a').withText('Actions'))
        .click(Selector('a').withText('Change Password'))
        .typeText(Selector('#old_password'), '321admin')
        .pressKey('tab')
        .typeText(Selector('#password'), 'admin123')
        .pressKey('tab')
        .typeText(Selector('#confirm'), 'admin123')
        .click(Selector('#submit'))
        .expect(Selector('.alert.alert-success.alert-dismissible').textContent).eql("\n                ×\n                Success! Your password has been changed successfully!\n            ");
});
