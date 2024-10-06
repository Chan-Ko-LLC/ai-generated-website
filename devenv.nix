{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "AI Generated Website Repo";

  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    pkgs.nodejs_22
    pkgs.pnpm
  ];

  # https://devenv.sh/scripts/
  scripts = {
    hello.exec = ''echo -e "\033[0;32m### Welcome to the $GREET! ###\033[0m"'';
  };

  enterShell = ''
    hello
    git update-index --assume-unchanged scripts/prevent-main-commits.sh
    echo "# NOTE: scripts/prevent-main-commits.sh is no longer being tracked by git."
    echo "# NOTE: If you have not yet done so, please follow the instructions in that file for local setup."
    echo "# NOTE: If required, you can re-enable git tracking, with:"
    echo "# NOTE: git update-index --no-assume-unchanged scripts/prevent-main-commits.sh"
  '';

  # https://devenv.sh/pre-commit-hooks/
  pre-commit.hooks = {
    no-main-branch-commits = {
      enable = true;
      entry = "bash scripts/prevent-main-commits.sh";
    };

    no-main-branch-pushes = {
      enable = true;
      entry = "bash scripts/prevent-main-push.sh";
      stages = [ "pre-push" ];
    };

    chan-ko-testing = {
      enable = true;
      name = "Chan-Ko Website Testing";
      entry = "pnpm test:chan-ko-website";
      pass_filenames = false;
      verbose = true;
    };

    end-of-file-fixer.enable = true;

    gts = {
      enable = true;
      name = "Google TypeScript Style Guide Enforcement";
      entry = "pnpm run lint:fix";
      pass_filenames = false;
    };

    trim-trailing-whitespace.enable = true;
  };

  # Additional devenv options:

  # https://devenv.sh/tests/

  # https://devenv.sh/services/

  # https://devenv.sh/languages/

  # https://devenv.sh/processes/

  # See full reference at https://devenv.sh/reference/options/
}
