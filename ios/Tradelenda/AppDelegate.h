#import <RCTAppDelegate.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <UIKit/UIKit.h>

// @interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>
@interface AppDelegate : RCTAppDelegate <UIApplicationDelegate, UNUserNotificationCenterDelegate>

@end
