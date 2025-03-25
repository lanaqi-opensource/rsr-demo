import type { AppConfig, RuntimeContext } from '@modern-js/runtime';
import { Helmet } from '@modern-js/runtime/head';
import { Link, Outlet } from '@modern-js/runtime/router';

import '@/styles/global.scss';

import { AccessBehave, type AccessPath, SimpleUser, withSecurityBlocker } from '@lanaqi/rsr';
import { nProgressAddon } from '@lanaqi/rsr-nprogress';

export const config = (): AppConfig => {
  return {};
};

export const init = (context: RuntimeContext) => {
  return {};
};

function RootLayout() {
  return (
    <>
      <Helmet titleTemplate="%s | 例子" />
      <div className="size-full">
        <div className="w-1/5 h-full float-left">
          <ul className="size-full">
            <li>
              <Link to={'/'}>/</Link>
            </li>
            <li>
              <Link to={'/hello'}>/hello0</Link>
            </li>
            <li>
              <Link to={'/hello?a=1'}>/hello1</Link>
            </li>
            <li>
              <Link to={'/hello?a=1&b=2'}>/hello2</Link>
            </li>
            <li>
              <Link to={'/hello?a=1&b=2#c'}>/hello3</Link>
            </li>
            <li>
              <Link to={'/hello?e=11&f=12#g'}>/hello4</Link>
            </li>
            <li>
              <Link to={'/sheet'}>/sheet</Link>
            </li>
            <li>
              <Link to={'/dashboard/aaa'}>/dashboard/aaa</Link>
            </li>
            <li>
              <Link to={'/dashboard/setting'}>/dashboard/setting</Link>
            </li>
            <li>
              <Link to={'/dashboard/user'}>/dashboard/user</Link>
            </li>
            <li>
              <Link to={'/dashboard/tabs/plan'}>/dashboard/tabs/plan</Link>
            </li>
            <li>
              <Link to={'/dashboard/tabs/schedule'}>/dashboard/tabs/schedule</Link>
            </li>
            <li>
              <Link to={'/admin/aaa'}>/admin/aaa</Link>
            </li>
            <li>
              <Link to={'/admin/setting'}>/admin/setting</Link>
            </li>
            <li>
              <Link to={'/admin/user'}>/admin/user</Link>
            </li>
            <li>
              <Link to={'/admin/tabs/plan'}>/admin/tabs/plan</Link>
            </li>
            <li>
              <Link to={'/admin/tabs/schedule'}>/admin/tabs/schedule</Link>
            </li>
            <li>
              <Link to={'/login'}>/login</Link>
            </li>
            <li>
              <Link to={'/logout'}>/logout</Link>
            </li>
          </ul>
        </div>
        <div className="w-4/5 h-full float-left">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default withSecurityBlocker(RootLayout, bundler => {
  return bundler
    .context(builder => {
      return (
        builder
          .hierarchy('admin>users;superadmin>admin;users>guest')
          .resource(rb => rb.patterns('/login', '/logout', '/denied', '/signature').anonymous().build())
          // .resource(rb => rb.patterns('/hello', '/sheet').permissions('admin').build())
          // 等同于上述注释
          .resource(rb =>
            rb
              .config({
                patterns: ['/hello', '/sheet'],
                permissions: ['admin'],
              })
              .build(),
          )
          .resource(rb => rb.patterns('/dashboard/tabs/*').permissions('users').build())
          .resource(rb =>
            rb
              .patterns('/dashboard/user')
              .permissions('admin')
              .signatured()
              // .isAlwaysSignature()
              .build(),
          )
          .resource(rb => rb.patterns('/dashboard/aaa').permissions('admin').signatured().build())
          .resource(rb => rb.patterns('/dashboard/*').permissions('superadmin').alwaysSignature().build())
          .resource(rb => rb.patterns('/admin/aaa').permissions('users').alwaysSignature().build())
          .resource(rb => rb.patterns('/admin/setting').permissions('admin').signatured().build())
          .resource(rb => rb.patterns('/admin/*').permissions('users').build())
          .resource(rb => rb.patterns('/*').authenticated().build())
          // .validator((recorder, authentication) => {
          //   if (recorder.isCurrentPath('/sheet') && authentication instanceof SimpleUser) {
          //     authentication.setInvalid(true);
          //   } else if (recorder.isCurrentPath('/hello') && authentication instanceof SimpleUser && authentication.isInvalid()) {
          //     return false;
          //   }
          //   return true;
          // })
          .build()
      );
    })
    .manager(builder => {
      return builder
        .behave({
          notAuthenticationPath: '/login',
          accessDeniedPath: '/denied',
          // notSignaturePath: '/signature',
          notSignatureFunc: context => {
            let userConfirmation: boolean;
            if (context.getRecorder().isOriginPaths('/dashboard/setting', '/dashboard/aaa')) {
              userConfirmation = window.confirm('接下来的操作会影响系统，你确定吗？');
            } else {
              userConfirmation = window.confirm('接下来的操作需要再次确定，需要吗？');
            }
            if (userConfirmation) {
              const recorder = context.getRecorder();
              const storer = context.getStorer();
              const path = recorder.getCurrentPath() as AccessPath;
              storer.saveSignature(recorder, path);
              console.log('用户点击了确定。');
            } else {
              console.log('用户点击了取消。');
              // return AccessBehave.doNothing;
            }
            return AccessBehave.reDecision;
          },
          // invalidAuthenticationFunc: context => {
          //   const authentication = context.getRecorder().getAccessAuthentication();
          //   if (authentication && authentication instanceof SimpleUser) {
          //     console.log('重新认证');
          //     authentication.setInvalid(false);
          //   }
          //   return AccessBehave.reDecision;
          // },
        })
        .build();
    })
    .addons(nProgressAddon())
    .build();
});
