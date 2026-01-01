"""
Enhanced Resume Analysis Service

This module provides advanced resume analysis capabilities including:
- Enhanced skill detection with categorization and level detection
- Experience recognition and parsing
- Project analysis
- Education and certification extraction
- Comprehensive resume scoring and insights
"""
import re
import json
from datetime import datetime
from typing import Dict, List, Optional, Tuple, Set, Any
from dataclasses import dataclass
from enum import Enum

from .section_parser import SectionType, ResumeParser
from .skill_utils import (
    extract_skills_from_text, 
    merge_skills, 
    categorize_skill,
    format_skills_for_output,
    SkillLevel
)

class ExperienceLevel(Enum):
    INTERN = "Internship"
    ENTRY = "Entry Level"
    MID = "Mid Level"
    SENIOR = "Senior"
    LEAD = "Lead"
    PRINCIPAL = "Principal"
    EXECUTIVE = "Executive"

@dataclass
class Experience:
    company: str
    title: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: bool = False
    location: Optional[str] = None
    description: Optional[str] = None
    skills: List[Dict] = None
    achievements: List[str] = None
    level: Optional[ExperienceLevel] = None

@dataclass
class Project:
    name: str
    description: str
    technologies: List[str]
    role: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: bool = False
    url: Optional[str] = None
    impact: Optional[str] = None

@dataclass
class Education:
    degree: str
    institution: str
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    gpa: Optional[float] = None
    location: Optional[str] = None
    honors: List[str] = None
    description: Optional[str] = None

@dataclass
class Certification:
    name: str
    issuer: str
    issue_date: Optional[str] = None
    expiration_date: Optional[str] = None
    credential_id: Optional[str] = None
    url: Optional[str] = None

class EnhancedResumeAnalyzer:
    """
    Enhanced resume analysis service that provides comprehensive parsing and insights
    for resumes with support for various sections and data types.
    """
    
    def __init__(self, resume_text: str):
        """Initialize the analyzer with resume text."""
        self.resume_text = resume_text
        self.parser = ResumeParser()
        self.sections = self.parser.parse_sections(resume_text)
        self.skills = []
        self.experiences = []
        self.projects = []
        self.education = []
        self.certifications = []
    
    def analyze(self) -> Dict[str, Any]:
        """
        Perform comprehensive resume analysis.
        
        Returns:
            Dict containing all extracted resume information
        """
        # Extract and process all sections
        self._extract_skills()
        self._extract_experience()
        self._extract_projects()
        self._extract_education()
        self._extract_certifications()
        
        # Generate insights and analysis
        insights = self._generate_insights()
        
        # Format the response
        return {
            'skills': self._format_skills(),
            'experience': [exp.__dict__ for exp in self.experiences],
            'projects': [proj.__dict__ for proj in self.projects],
            'education': [edu.__dict__ for edu in self.education],
            'certifications': [cert.__dict__ for cert in self.certifications],
            'analysis': insights
        }
    
    def _extract_skills(self) -> None:
        """Extract and categorize skills from all relevant sections."""
        # Extract from skills section
        if SectionType.SKILLS in self.sections:
            skill_text = self.sections[SectionType.SKILLS].content
            detected_skills = extract_skills_from_text(skill_text, 'skills')
            self.skills = merge_skills([], detected_skills)
        
        # Extract from experience section
        if SectionType.EXPERIENCE in self.sections:
            exp_text = self.sections[SectionType.EXPERIENCE].content
            detected_skills = extract_skills_from_text(exp_text, 'experience')
            self.skills = merge_skills(self.skills, detected_skills)
        
        # Extract from projects section
        if SectionType.PROJECTS in self.sections:
            proj_text = self.sections[SectionType.PROJECTS].content
            detected_skills = extract_skills_from_text(proj_text, 'projects')
            self.skills = merge_skills(self.skills, detected_skills)
    
    def _extract_experience(self) -> None:
        """Extract and parse work experience."""
        if SectionType.EXPERIENCE not in self.sections:
            return
            
        # Simple regex-based extraction - in a real implementation, this would be more sophisticated
        experience_text = self.sections[SectionType.EXPERIENCE].content
        
        # Split into individual experiences (this is a simplified approach)
        experience_blocks = re.split(r'\n\s*\n', experience_text)
        
        for block in experience_blocks:
            # Skip empty blocks
            if not block.strip():
                continue
                
            # Try to extract company and title (this is a simplified example)
            lines = [line.strip() for line in block.split('\n') if line.strip()]
            if not lines:
                continue
                
            # First line typically contains title and company
            first_line = lines[0]
            title_company = first_line.split(' at ', 1)
            
            if len(title_company) == 2:
                title, company = title_company
            else:
                title, company = first_line, ""
            
            # Extract dates (simplified)
            start_date = None
            end_date = None
            is_current = False
            
            # Look for date patterns in the first few lines
            date_pattern = r'(\w+\s+\d{4})\s*[-–]\s*(\w+\s+\d{4}|Present|Current|Now)'
            for line in lines[1:3]:  # Check first few lines for dates
                date_match = re.search(date_pattern, line, re.IGNORECASE)
                if date_match:
                    start_date = date_match.group(1)
                    end_date = date_match.group(2)
                    if end_date.lower() in ['present', 'current', 'now']:
                        is_current = True
                        end_date = "Present"
                    break
            
            # Extract description (rest of the text)
            description = '\n'.join(lines[1:]) if len(lines) > 1 else None
            
            # Extract skills mentioned in this experience
            detected_skills = extract_skills_from_text(block, 'experience')
            
            # Create experience object
            exp = Experience(
                company=company.strip(),
                title=title.strip(),
                start_date=start_date,
                end_date=end_date,
                is_current=is_current,
                description=description,
                skills=[s.__dict__ for s in detected_skills],
                achievements=self._extract_achievements(block)
            )
            
            self.experiences.append(exp)
    
    def _extract_achievements(self, text: str) -> List[str]:
        """Extract bullet points or achievements from text."""
        # This is a simplified version - in practice, you'd want more sophisticated parsing
        achievements = []
        
        # Look for bullet points or lines that look like achievements
        for line in text.split('\n'):
            line = line.strip()
            if not line:
                continue
                
            # Check for bullet points or numbered lists
            if line.startswith(('•', '-', '• ', '- ', '* ', '> ')):
                achievements.append(line[1:].strip())
            # Check for lines that look like achievements (start with action verb)
            elif re.match(r'^[A-Z][a-z]+(ed|ing)\b', line):
                achievements.append(line)
        
        return achievements
    
    def _extract_projects(self) -> None:
        """Extract and parse projects."""
        if SectionType.PROJECTS not in self.sections:
            return
            
        projects_text = self.sections[SectionType.PROJECTS].content
        
        # Split into individual projects (simplified)
        project_blocks = re.split(r'\n\s*\n', projects_text)
        
        for block in project_blocks:
            if not block.strip():
                continue
                
            lines = [line.strip() for line in block.split('\n') if line.strip()]
            if not lines:
                continue
                
            # First line is typically project name and possibly role/date
            first_line = lines[0]
            
            # Try to extract project name and role/date
            name_parts = re.split(r'\s*[-–]\s*', first_line, 1)
            name = name_parts[0].strip()
            role_date = name_parts[1] if len(name_parts) > 1 else None
            
            # Extract dates if present
            start_date = end_date = None
            is_current = False
            
            if role_date:
                date_pattern = r'(\w+\s+\d{4})\s*[-–]\s*(\w+\s+\d{4}|Present|Current|Now)'
                date_match = re.search(date_pattern, role_date, re.IGNORECASE)
                if date_match:
                    start_date = date_match.group(1)
                    end_date = date_match.group(2)
                    if end_date.lower() in ['present', 'current', 'now']:
                        is_current = True
                        end_date = "Present"
            
            # The rest is description
            description = '\n'.join(lines[1:]) if len(lines) > 1 else None
            
            # Extract technologies mentioned
            detected_skills = extract_skills_from_text(block, 'projects')
            technologies = list({s.name for s in detected_skills})
            
            # Create project object
            project = Project(
                name=name,
                description=description,
                technologies=technologies,
                start_date=start_date,
                end_date=end_date,
                is_current=is_current
            )
            
            self.projects.append(project)
    
    def _extract_education(self) -> None:
        """Extract education information."""
        if SectionType.EDUCATION not in self.sections:
            return
            
        education_text = self.sections[SectionType.EDUCATION].content
        
        # Split into individual education entries
        edu_blocks = re.split(r'\n\s*\n', education_text)
        
        for block in edu_blocks:
            if not block.strip():
                continue
                
            lines = [line.strip() for line in block.split('\n') if line.strip()]
            if not lines:
                continue
                
            # First line is typically degree and institution
            first_line = lines[0]
            
            # Try to split degree and institution
            parts = re.split(r',\s*|\s+at\s+|\s+from\s+', first_line, 1)
            if len(parts) >= 2:
                degree = parts[0].strip()
                institution = parts[1].strip()
            else:
                degree = first_line
                institution = ""
            
            # Extract dates and GPA
            start_date = end_date = gpa = None
            
            for line in lines[1:]:
                # Look for date range
                date_match = re.search(
                    r'(\w+\s+\d{4})\s*[-–]\s*(\w+\s+\d{4}|Present|Current|Graduated)', 
                    line, 
                    re.IGNORECASE
                )
                if date_match:
                    start_date = date_match.group(1)
                    end_date = date_match.group(2)
                
                # Look for GPA
                gpa_match = re.search(r'GPA[:\s]*(\d\.\d+\s*/?\s*\d?\.?\d*)', line, re.IGNORECASE)
                if gpa_match:
                    gpa_str = gpa_match.group(1).split('/')[0].strip()  # Take first part if it's a range
                    try:
                        gpa = float(gpa_str)
                    except ValueError:
                        pass
            
            # Create education object
            education = Education(
                degree=degree,
                institution=institution,
                start_date=start_date,
                end_date=end_date,
                gpa=gpa,
                description='\n'.join(lines[1:]) if len(lines) > 1 else None
            )
            
            self.education.append(education)
    
    def _extract_certifications(self) -> None:
        """Extract certifications."""
        if SectionType.CERTIFICATIONS not in self.sections:
            return
            
        certs_text = self.sections[SectionType.CERTIFICATIONS].content
        
        # Split into individual certifications
        cert_blocks = re.split(r'\n\s*\n', certs_text)
        
        for block in cert_blocks:
            if not block.strip():
                continue
                
            lines = [line.strip() for line in block.split('\n') if line.strip()]
            if not lines:
                continue
                
            # First line is typically certification name and issuer
            first_line = lines[0]
            
            # Try to split certification name and issuer
            parts = re.split(r',\s*|\s+from\s+|\s+by\s+', first_line, 1)
            if len(parts) >= 2:
                name = parts[0].strip()
                issuer = parts[1].strip()
            else:
                name = first_line
                issuer = ""
            
            # Look for issue date and credential ID
            issue_date = credential_id = None
            
            for line in lines[1:]:
                # Look for issue date
                date_patterns = [
                    r'(?:Issued|Earned)[:\s]*(\w+\s+\d{4})',
                    r'(\w+\s+\d{4})\s*[-–]\s*(?:Present|Current|Now)'
                ]
                
                for pattern in date_patterns:
                    date_match = re.search(pattern, line, re.IGNORECASE)
                    if date_match:
                        issue_date = date_match.group(1)
                        break
                
                # Look for credential ID
                id_match = re.search(r'(?:ID|Credential)[:\s]*(\w[\w\s-]+)', line, re.IGNORECASE)
                if id_match:
                    credential_id = id_match.group(1).strip()
            
            # Create certification object
            cert = Certification(
                name=name,
                issuer=issuer,
                issue_date=issue_date,
                credential_id=credential_id
            )
            
            self.certifications.append(cert)
    
    def _format_skills(self) -> Dict[str, List[Dict]]:
        """Format skills into the output structure."""
        return format_skills_for_output(self.skills)
    
    def _generate_insights(self) -> Dict[str, Any]:
        """Generate insights and analysis based on the extracted data."""
        insights = {
            'strengths': [],
            'areas_for_improvement': [],
            'role_suitability': {}
        }
        
        # Generate strengths based on skills and experience
        if self.skills:
            tech_skills = [s for s in self.skills if s.get('category') in ['programming_languages', 'frameworks', 'tools']]
            if tech_skills:
                insights['strengths'].append(
                    f"Strong technical skills in {', '.join(s['name'] for s in tech_skills[:3])} and {len(tech_skills) - 3} other technologies."
                )
        
        # Add experience-based strengths
        if self.experiences:
            years_exp = min(len(self.experiences) * 2, 15)  # Rough estimate
            insights['strengths'].append(f"{years_exp}+ years of professional experience.")
        
        # Add education-based strengths
        if self.education:
            highest_degree = max(
                self.education, 
                key=lambda e: self._get_degree_level(e.degree) if e.degree else 0
            )
            insights['strengths'].append(f"Holds a {highest_degree.degree} from {highest_degree.institution}.")
        
        # Generate areas for improvement
        if not any(proj.get('impact') for proj in self.projects):
            insights['areas_for_improvement'].append(
                "Add measurable impact to your project descriptions (e.g., 'Improved performance by X%' or 'Reduced costs by $Y')."
            )
        
        if not any(cert.get('name') for cert in self.certifications):
            insights['areas_for_improvement'].append(
                "Consider adding relevant certifications to validate your skills."
            )
        
        # Role suitability (simplified example)
        if any(skill['name'].lower() in ['python', 'javascript', 'java'] for skill in self.skills):
            insights['role_suitability']['Software Developer'] = 85
        
        if any(exp.get('title', '').lower() in ['manager', 'lead', 'director'] for exp in self.experiences):
            insights['role_suitability']['Engineering Manager'] = 80
        
        return insights
    
    @staticmethod
    def _get_degree_level(degree: str) -> int:
        """Get a numeric level for degree comparison."""
        degree = degree.lower()
        if 'phd' in degree or 'doctor' in degree:
            return 5
        elif 'master' in degree or 'msc' in degree or 'mba' in degree:
            return 4
        elif 'bachelor' in degree or 'bsc' in degree or 'ba ' in degree:
            return 3
        elif 'associate' in degree or 'diploma' in degree:
            return 2
        return 1

def analyze_resume(resume_text: str) -> Dict[str, Any]:
    """
    Convenience function to analyze a resume with default settings.
    
    Args:
        resume_text: The raw text content of the resume
        
    Returns:
        Dict containing the analysis results
    """
    analyzer = EnhancedResumeAnalyzer(resume_text)
    return analyzer.analyze()
