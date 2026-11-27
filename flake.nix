{
	description = "shuntksh.com development environment";

	inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

	outputs =
		{ nixpkgs, ... }:
		let
			systems = [
				"aarch64-darwin"
				"x86_64-darwin"
				"aarch64-linux"
				"x86_64-linux"
			];
			forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
		in
		{
			devShells = forAllSystems (pkgs: {
				default = pkgs.mkShellNoCC {
					# Wrangler is pinned in package.json and installed with `bun install`.
					packages = [
						pkgs.git
						pkgs.bun
						pkgs.nodejs_24
					];
				};
			});
		};
}
