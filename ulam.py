import pygame
import math

pygame.init()

def main():
    screen_size = 1100
    dot_num = 400 #How many dots on onw axis
    dot_size = (screen_size/dot_num)/2 #The size of each dot
    dot_distance = int(screen_size/dot_num)

    count = 1

    step_direction = 0
    step_max = 1
    step_count = 0
    turn_count = 0
    size_up = 1
    
    #Positions
    start_x = screen_size/2
    start_y = screen_size/2
    current_x = start_x
    current_y = start_y

    screen = pygame.display.set_mode((screen_size, screen_size))

    run = True

    screen.fill((185,214,242))

    pygame.draw.circle(screen , (6,26,64), (start_x, start_y), dot_size)

    while True:
        count += 1
        old_x = current_x
        old_y = current_y

        if step_direction > 3:
            step_direction = 0
        
        match step_direction:
            case 0:
                #Right
                current_x = current_x + dot_distance
                current_y = current_y
            case 1:
                #Up
                current_x = current_x 
                current_y = current_y - dot_distance
            case 2:
                #left
                current_x = current_x - dot_distance
                current_y = current_y

            case 3:
                #Down
                current_x = current_x 
                current_y = current_y + dot_distance


        
        if 0 < current_x < screen_size and 0 < current_y < screen_size:
            #pygame.draw.line(screen,(6,26,64), (old_x, old_y), (current_x, current_y), width=1)
            if check_prime(count):
                pygame.draw.circle(screen, (6,26,64), (current_x, current_y), dot_size)
                dot_size += 0.0001

            step_count += 1


            if step_count == step_max:
                step_count = 0
                step_direction += 1
                turn_count += 1

            if turn_count > 1:
                step_max += 1
                turn_count = 0

        else:
            break

    while run:
        
        #ulam(screen_size, screen)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
        
        pygame.display.flip()

    pygame.quit()


def check_prime(n):

    if n > 1:   
        for i in range(2 ,int(math.sqrt(n))+1):
            #print(i)
            if n % i == 0:
                return False
    else:
        return False
    
    return True
    

main()