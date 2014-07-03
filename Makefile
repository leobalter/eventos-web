generate:
	@node index.js

deploy:
	@git commit . -m 'Updating README.'
	@git checkout gh-pages && git merge master && make generate
	@git commit index.html -m 'Updated lineup.' && git push origin gh-pages
	@git checkout master
