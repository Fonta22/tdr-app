keywords = open('keywords.txt', 'r').read().split('\n') # array

sorted = sorted(keywords)
content = '\n'.join(sorted)

keywords = open('keywords.txt', 'w')
keywords.write(content)