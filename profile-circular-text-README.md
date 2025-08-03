# Profile Container with Circular Text

This repository contains different implementations of a profile container with circular text. Each implementation demonstrates a different approach to creating circular text around a profile image.

## Implementations

### 1. Basic CSS Implementation

**File:** Added to `style.css`

This is the simplest implementation using basic CSS. It creates a profile container with a circular image and a gradient border. The text is positioned around the image but doesn't follow a circular path.

```html
<div class="profile-container">
  <img src="your-image.jpg" alt="Profile" class="profile-image" />
  <div class="circle-border"></div>
  <div class="rotated-text">I'm Frontend & I'm Designer</div>
</div>
```

### 2. SVG with textPath Implementation

**File:** `profile-circular-text.html`

This implementation uses SVG with textPath to create text that follows a circular path. This is a more advanced approach that provides better text placement around the circle.

Key features:
- Text perfectly follows a circular path
- Smooth animation with CSS
- Responsive design with media queries

### 3. CSS Transform Implementation

**File:** `profile-circular-text-css.html`

This implementation uses CSS transforms to position each character individually around the circle. This approach gives you more control over each character's placement.

Key features:
- Pure CSS approach (with JavaScript for character positioning)
- Each character is individually positioned
- Responsive design with dynamic adjustments

### 4. Advanced SVG Implementation

**File:** `profile-circular-text-advanced.html`

This is the most advanced implementation combining SVG with CSS effects for a polished result.

Key features:
- Gradient text effect
- Smooth animations with hover effects
- Responsive design with better visual appeal
- Counter-rotating border for dynamic effect

## How to Use

1. Choose the implementation that best fits your needs
2. Copy the HTML, CSS, and JavaScript code from the corresponding file
3. Replace `nitesh.jpeg` with your own profile image
4. Customize the text, colors, and animations as needed

## Customization Options

### Changing the Text

In each implementation, find the text "I'm Frontend & I'm Designer" and replace it with your own text.

### Changing Colors

- **Gradient Border:** Look for `conic-gradient` in the CSS and modify the color values
- **Text Color:** Modify the `color` or `fill` property for the text
- **Background:** Change the `background-color` property

### Adjusting Sizes

Each implementation includes media queries for responsive design. You can adjust the sizes by modifying:

- The width and height of `.profile-container`
- The font size of the text
- The positioning values for the text

## Advanced Customization

### SVG Path Adjustments

In the SVG implementations, you can adjust the circular path by modifying the path data:

```svg
<path id="circle-path" d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0" />
```

- The first two values (`200, 200`) define the center point
- The next values (`-160, 0`) define the starting point relative to the center
- The `a 160,160 0 1,1 320,0` defines the arc (radius 160px)

### Animation Speed

Adjust the animation speed by modifying the animation duration:

```css
animation: rotate 20s linear infinite;
```

Change `20s` to a smaller value for faster rotation or a larger value for slower rotation.