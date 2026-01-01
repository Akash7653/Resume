"""
Utility functions for skill detection and extraction from resumes.
"""
import re
from typing import List, Dict, Set, Tuple, Optional, Union
from enum import Enum
from dataclasses import dataclass

class SkillLevel(Enum):
    EXPERT = "Expert"
    ADVANCED = "Advanced"
    INTERMEDIATE = "Intermediate"
    BEGINNER = "Beginner"
    NOVICE = "Novice"

@dataclass
class DetectedSkill:
    name: str
    level: Optional[SkillLevel] = None
    category: Optional[str] = None
    source: Optional[str] = None
    context: Optional[str] = None

# Common skill categories
class SkillCategory(Enum):
    PROGRAMMING = "programming_languages"
    FRAMEWORKS = "frameworks"
    TOOLS = "tools"
    DATABASES = "databases"
    PLATFORMS = "platforms"
    METHODOLOGIES = "methodologies"
    LANGUAGES = "languages"
    SOFT_SKILLS = "soft_skills"
    CERTIFICATIONS = "certifications"
    LIBRARIES = "libraries"

# Common skill level indicators
SKILL_LEVEL_INDICATORS = {
    SkillLevel.EXPERT: ['expert', 'master', 'guru', 'specialist', 'proficient'],
    SkillLevel.ADVANCED: ['advanced', 'strong', 'extensive', 'in-depth'],
    SkillLevel.INTERMEDIATE: ['intermediate', 'working', 'practical', 'hands-on'],
    SkillLevel.BEGINNER: ['beginner', 'basic', 'familiar', 'elementary'],
    SkillLevel.NOVICE: ['novice', 'learning', 'exploring']
}

def detect_skill_level(skill_text: str) -> Tuple[str, Optional[SkillLevel]]:
    """
    Extract skill name and level from text like 'Python (Advanced)'
    Returns (skill_name, skill_level)
    """
    # Check for skill level in parentheses
    level_match = re.search(r'\(([^)]+)\)$', skill_text.strip())
    if level_match:
        level_text = level_match.group(1).lower()
        skill_name = skill_text[:level_match.start()].strip()
        
        # Check for each level
        for level, indicators in SKILL_LEVEL_INDICATORS.items():
            if any(indicator in level_text for indicator in indicators):
                return skill_name, level
        
        # If no match, return with level as None
        return skill_name, None
    
    return skill_text.strip(), None

def extract_skills_from_text(text: str, source: str = None) -> List[DetectedSkill]:
    """
    Extract skills from a block of text with optional skill level detection
    """
    # Common skill delimiters
    delimiters = [',', '|', ';', '•', '-', '–', '—', '•', '·', '*', '~']
    
    # Create a regex pattern that matches any of the delimiters
    delimiter_pattern = '|'.join(map(re.escape, delimiters))
    
    # Split the text by any of the delimiters
    potential_skills = re.split(delimiter_pattern, text)
    
    detected_skills = []
    
    for item in potential_skills:
        item = item.strip()
        if not item:
            continue
            
        # Detect skill and level
        skill_name, skill_level = detect_skill_level(item)
        
        # Skip empty or very short skills
        if len(skill_name) < 2:
            continue
            
        # Create skill object
        skill = DetectedSkill(
            name=skill_name,
            level=skill_level,
            source=source,
            context=text if len(text) < 100 else None  # Include context if not too long
        )
        
        detected_skills.append(skill)
    
    return detected_skills

def categorize_skill(skill_name: str) -> Optional[str]:
    """
    Categorize a skill into a predefined category
    """
    # This is a simplified version - in practice, you'd want a more comprehensive mapping
    skill_name = skill_name.lower()
    
    # Programming languages
    programming_languages = ['python', 'javascript', 'java', 'c#', 'c++', 'go', 'ruby', 'php', 'swift', 'kotlin', 
                            'typescript', 'rust', 'scala', 'r', 'matlab', 'perl', 'haskell', 'clojure', 'elixir']
    
    # Frameworks and libraries
    frameworks = ['react', 'angular', 'vue', 'django', 'flask', 'spring', 'express', 'laravel', 'ruby on rails', 
                 'asp.net', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'node.js', 'next.js',
                 'nuxt.js', 'svelte', 'jquery']
    
    # Databases
    databases = ['mysql', 'postgresql', 'mongodb', 'redis', 'oracle', 'sql server', 'sqlite', 'dynamodb', 'cassandra',
                'elasticsearch', 'firebase', 'cosmosdb', 'neo4j', 'couchbase']
    
    # Tools and platforms
    tools = ['git', 'docker', 'kubernetes', 'jenkins', 'ansible', 'terraform', 'aws', 'azure', 'gcp', 'heroku',
            'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'trello', 'asana', 'figma', 'sketch',
            'adobe xd', 'photoshop', 'illustrator', 'tableau', 'power bi', 'excel', 'looker', 'snowflake',
            'databricks', 'kafka', 'rabbitmq', 'nginx', 'apache']
    
    # Check categories
    if any(lang in skill_name for lang in programming_languages):
        return SkillCategory.PROGRAMMING.value
    elif any(framework in skill_name for framework in frameworks):
        return SkillCategory.FRAMEWORKS.value
    elif any(db in skill_name for db in databases):
        return SkillCategory.DATABASES.value
    elif any(tool in skill_name for tool in tools):
        return SkillCategory.TOOLS.value
    
    return None

def merge_skills(existing_skills: List[Dict], new_skills: List[DetectedSkill]) -> List[Dict]:
    """
    Merge newly detected skills with existing skills, updating levels and sources
    """
    # Convert existing skills to a dict for easier merging
    skill_map = {}
    
    # Add existing skills to the map
    for skill in existing_skills:
        skill_map[skill['name'].lower()] = {
            'name': skill['name'],
            'level': skill.get('level'),
            'sources': set(skill.get('sources', [])),
            'category': skill.get('category')
        }
    
    # Add or update with new skills
    for skill in new_skills:
        skill_lower = skill.name.lower()
        
        # If skill already exists, update its properties
        if skill_lower in skill_map:
            existing = skill_map[skill_lower]
            
            # Update level if the new one is higher
            if skill.level and (not existing['level'] or 
                              list(SkillLevel).index(skill.level) < list(SkillLevel).index(existing['level'])):
                existing['level'] = skill.level.value if skill.level else None
            
            # Add source if provided
            if skill.source:
                existing['sources'].add(skill.source)
                
            # Update category if not set
            if not existing['category'] and skill.category:
                existing['category'] = skill.category
        else:
            # Add new skill
            category = skill.category or categorize_skill(skill.name)
            skill_map[skill_lower] = {
                'name': skill.name,
                'level': skill.level.value if skill.level else None,
                'sources': {skill.source} if skill.source else set(),
                'category': category
            }
    
    # Convert back to list of dicts
    result = []
    for skill_data in skill_map.values():
        result.append({
            'name': skill_data['name'],
            'level': skill_data['level'],
            'sources': list(skill_data['sources']) if skill_data['sources'] else ['skills'],
            'category': skill_data['category']
        })
    
    return result

def extract_skills_from_sections(sections: dict) -> List[Dict]:
    """
    Extract skills from different resume sections
    """
    skills = []
    
    # Extract from skills section
    if 'skills' in sections:
        skill_text = sections['skills']
        detected_skills = extract_skills_from_text(skill_text, 'skills')
        skills.extend(detected_skills)
    
    # Extract from experience section
    if 'experience' in sections:
        experience_text = sections['experience']
        detected_skills = extract_skills_from_text(experience_text, 'experience')
        skills.extend(detected_skills)
    
    # Extract from projects section
    if 'projects' in sections:
        projects_text = sections['projects']
        detected_skills = extract_skills_from_text(projects_text, 'projects')
        skills.extend(detected_skills)
    
    # Categorize all skills
    for skill in skills:
        if not skill.category:
            skill.category = categorize_skill(skill.name)
    
    return skills

def format_skills_for_output(skills: List[Dict]) -> Dict[str, List[Dict]]:
    """
    Format skills into the output structure
    """
    result = {}
    
    for skill in skills:
        category = skill.get('category', 'other')
        if category not in result:
            result[category] = []
        
        skill_data = {
            'name': skill['name'],
            'sources': skill.get('sources', [])
        }
        
        if 'level' in skill and skill['level']:
            skill_data['level'] = skill['level']
        
        result[category].append(skill_data)
    
    return result
