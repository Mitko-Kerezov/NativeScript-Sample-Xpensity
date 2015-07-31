# Expensity sample app

Expensity is an enterprise line of business application showing you how to deal with data and how to visualize the data in a rich and engaging way.

![Expensity app overview screen](https://www.nativescript.org/images/default-source/default-album/expensity-overview.png)
![Expensity app report details](https://www.nativescript.org/images/default-source/default-album/expensity-report-details.png)


## Running the sample

1. Make sure you have the [NativeScript Command-line Interface](https://www.npmjs.com/package/nativescript) installed as well as all the prerequisites for the NativeScript development, described in the package page.
2. Compile the TypeScript code
        
        2.1. Install the dev dependencies of the sample (TypeScript)
        `npm install`

        2.2. Compile the TypeScript code to JavaScript
        `node_modules/typescript/bin/tsc --outDir app/ -t ES5 -m commonjs app/**/*.tsz

3. Add the preferred platform-specific tools to the project library. Note that iOS development is only available with a Mac machine.

    `tns platform add ios|android`

4. Run the project.

    `tns run ios|android [--emulator]`

    The `--emulator` keyword instructs the CLI to load the iOS simulator or an android emulator depending on the platform you want.


For convenience you can use the `run.bat`/`run.sh` scripts on a \*NIX/windows environment respectively. The `run.sh` script starts the sample in iOS when run on a Mac and Android on Linux/Windows. The `run.bat` script runs the sample on an Android emulator under Windows.

For \*NIX systems the following script runs the sample directly:

`curl https://raw.githubusercontent.com/NativeScript/sample-Xpensity/master/run.sh | bash`
