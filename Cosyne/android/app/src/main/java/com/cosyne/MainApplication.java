package com.cosyne;

import android.app.Application;
import android.support.annotation.Nullable;
import com.facebook.react.ReactApplication;
import com.reactnativenavigation.NavigationApplication;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;





import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSensitiveInfoPackage(),
          new VectorIconsPackage(),
          new ReactMaterialKitPackage()
      );
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return null;
    }
}
