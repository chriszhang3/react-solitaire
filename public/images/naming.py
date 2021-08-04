import os

suits_old = ["C","D","H","S"]
suits_new = ["Clubs","Diamonds","Hearts","Spades"]
ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]

for r in ranks:
    for s in range(4):
        old_file = r + suits_old[s] + ".png"
        new_file = r + suits_new[s] + ".png"
        os.rename(old_file,new_file)
